# frozen_string_literal: true

require "jemoji"

# Ruby 3.3's regexp cache can exhaust memory when jemoji scans a long page
# with thousands of emoji alternatives. An atomic group around the complete
# pattern avoids that cache while preserving matches and capture group 1.
module EmojiRegexMemory
  def emoji_pattern
    @memory_safe_emoji_pattern ||= begin
      pattern = super
      Regexp.new("(?>#{pattern.source})", pattern.options)
    end
  end
end

HTML::Pipeline::EmojiFilter.singleton_class.prepend(EmojiRegexMemory)
